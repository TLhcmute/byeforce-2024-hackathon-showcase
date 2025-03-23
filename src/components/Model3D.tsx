
import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";

// Throttle function to limit how often a function runs
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const Model3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions with device pixel ratio consideration
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const displayWidth = 600;
      const displayHeight = 600;
      
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      
      // Scale for high DPI displays without increasing actual size
      if (devicePixelRatio > 1) {
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        ctx.scale(1, 1);
      }
    };
    
    setCanvasDimensions();
    
    // 3D cube parameters - simplified for performance
    const cube = {
      size: 150,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      distance: 500,
      lastMouseX: 0,
      lastMouseY: 0,
      isDragging: false,
      autoRotate: true,
    };
    
    // Pre-calculating vertices for better performance
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ];
    
    // Cube edges (pairs of vertex indices)
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];
    
    // Cube faces - simpler array structure
    const faces = [
      [0, 1, 2, 3], // back
      [4, 5, 6, 7], // front
      [0, 1, 5, 4], // bottom
      [2, 3, 7, 6], // top
      [0, 3, 7, 4], // left
      [1, 2, 6, 5], // right
    ];
    
    // Face colors
    const faceColors = [
      "rgba(100, 116, 139, 0.7)",  // back
      "rgba(100, 116, 139, 0.9)",  // front
      "rgba(71, 85, 105, 0.8)",    // bottom
      "rgba(148, 163, 184, 0.8)",  // top
      "rgba(148, 163, 184, 0.7)",  // left
      "rgba(71, 85, 105, 0.9)",    // right
    ];

    // Dark mode face colors
    const darkFaceColors = [
      "rgba(51, 65, 85, 0.7)",  // back
      "rgba(51, 65, 85, 0.9)",  // front
      "rgba(30, 41, 59, 0.8)",  // bottom
      "rgba(71, 85, 105, 0.8)", // top
      "rgba(71, 85, 105, 0.7)", // left
      "rgba(30, 41, 59, 0.9)",  // right
    ];
    
    // Memoize calculations where possible
    function project(point: number[]): [number, number] {
      // Apply rotations
      const cosX = Math.cos(cube.rotationX);
      const sinX = Math.sin(cube.rotationX);
      const cosY = Math.cos(cube.rotationY);
      const sinY = Math.sin(cube.rotationY);
      
      // Scale the point by cube size
      let x = point[0] * cube.size;
      let y = point[1] * cube.size;
      let z = point[2] * cube.size;
      
      // Rotate around X axis
      let y1 = y * cosX - z * sinX;
      let z1 = y * sinX + z * cosX;
      
      // Rotate around Y axis
      let x2 = x * cosY + z1 * sinY;
      let z2 = -x * sinY + z1 * cosY;
      
      // Simplified Z rotation for performance
      
      // Project to 2D (perspective projection)
      const scale = cube.distance / (cube.distance + z2);
      const projectedX = x2 * scale + canvas.width / 2;
      const projectedY = y1 * scale + canvas.height / 2;
      
      return [projectedX, projectedY];
    }
    
    function calculateNormal(face: number[]): number[] {
      const [a, b, c] = face.slice(0, 3);
      
      // Get vectors from vertices
      const v1 = [
        vertices[b][0] - vertices[a][0],
        vertices[b][1] - vertices[a][1],
        vertices[b][2] - vertices[a][2],
      ];
      
      const v2 = [
        vertices[c][0] - vertices[a][0],
        vertices[c][1] - vertices[a][1],
        vertices[c][2] - vertices[a][2],
      ];
      
      // Cross product to get normal
      return [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
      ];
    }
    
    function calculateCentroid(face: number[]): number[] {
      let x = 0, y = 0, z = 0;
      for (const vertexIndex of face) {
        x += vertices[vertexIndex][0];
        y += vertices[vertexIndex][1];
        z += vertices[vertexIndex][2];
      }
      return [x / face.length, y / face.length, z / face.length];
    }
    
    // More efficient drawing with lesser repaints
    function drawCube() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate visible faces (backface culling)
      const visibleFaces = faces.map((face, index) => {
        const normal = calculateNormal(face);
        const centroid = calculateCentroid(face);
        
        // View vector (from centroid to camera)
        const viewVector = [
          0 - centroid[0],
          0 - centroid[1],
          cube.distance - centroid[2],
        ];
        
        // Dot product to determine visibility
        const dotProduct = 
          normal[0] * viewVector[0] +
          normal[1] * viewVector[1] +
          normal[2] * viewVector[2];
        
        // Face is visible if dot product is positive
        return {
          face,
          index,
          centroid: centroid[2], // For depth sorting
          visible: dotProduct > 0,
        };
      })
      .filter(f => f.visible)
      .sort((a, b) => a.centroid - b.centroid); // Sort by depth (painter's algorithm)
      
      // Draw the visible faces
      visibleFaces.forEach(({ face, index }) => {
        const projectedVertices = face.map(vertexIndex => {
          return project(vertices[vertexIndex]);
        });
        
        ctx.beginPath();
        ctx.moveTo(projectedVertices[0][0], projectedVertices[0][1]);
        
        for (let i = 1; i < projectedVertices.length; i++) {
          ctx.lineTo(projectedVertices[i][0], projectedVertices[i][1]);
        }
        
        ctx.closePath();
        
        // Fill with color based on theme
        const colors = theme === "dark" ? darkFaceColors : faceColors;
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        // Stroke the edges
        ctx.strokeStyle = theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Simplified edge drawing
      edges.forEach(edge => {
        const [p1, p2] = edge.map(vertexIndex => {
          return project(vertices[vertexIndex]);
        });
        
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.strokeStyle = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }
    
    function animate() {
      if (cube.autoRotate) {
        // Slower rotation for better performance
        cube.rotationX += 0.002;
        cube.rotationY += 0.003;
      }
      
      drawCube();
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Mouse drag events with throttling
    const handleMouseDown = (e: MouseEvent) => {
      cube.isDragging = true;
      cube.autoRotate = false;
      cube.lastMouseX = e.clientX;
      cube.lastMouseY = e.clientY;
    };
    
    const handleMouseUp = () => {
      cube.isDragging = false;
    };
    
    const handleMouseMove = throttle((e: MouseEvent) => {
      if (cube.isDragging) {
        const deltaX = e.clientX - cube.lastMouseX;
        const deltaY = e.clientY - cube.lastMouseY;
        
        cube.rotationY += deltaX * 0.004;
        cube.rotationX += deltaY * 0.004;
        
        cube.lastMouseX = e.clientX;
        cube.lastMouseY = e.clientY;
      }
    }, 16); // Throttle to ~60fps
    
    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        cube.isDragging = true;
        cube.autoRotate = false;
        cube.lastMouseX = e.touches[0].clientX;
        cube.lastMouseY = e.touches[0].clientY;
      }
    };
    
    const handleTouchEnd = () => {
      cube.isDragging = false;
    };
    
    const handleTouchMove = throttle((e: TouchEvent) => {
      if (cube.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - cube.lastMouseX;
        const deltaY = e.touches[0].clientY - cube.lastMouseY;
        
        cube.rotationY += deltaX * 0.004;
        cube.rotationX += deltaY * 0.004;
        
        cube.lastMouseX = e.touches[0].clientX;
        cube.lastMouseY = e.touches[0].clientY;
      }
    }, 16); // Throttle to ~60fps
    
    // Event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [theme]);
  
  return (
    <div className="w-full max-w-[600px] h-[600px] mx-auto">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ touchAction: "none" }}
      />
      <p className="text-center text-sm text-foreground/60 mt-4">
        Drag to rotate the cube | Touch-enabled
      </p>
    </div>
  );
};

export default Model3D;
