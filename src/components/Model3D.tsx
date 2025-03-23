
import { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const Model3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 600;
    
    // 3D cube parameters
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
    
    // Cube vertices (x, y, z coordinates)
    const vertices = [
      [-1, -1, -1], // 0: back bottom left
      [1, -1, -1],  // 1: back bottom right
      [1, 1, -1],   // 2: back top right
      [-1, 1, -1],  // 3: back top left
      [-1, -1, 1],  // 4: front bottom left
      [1, -1, 1],   // 5: front bottom right
      [1, 1, 1],    // 6: front top right
      [-1, 1, 1],   // 7: front top left
    ];
    
    // Cube edges (pairs of vertex indices)
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];
    
    // Cube faces (arrays of vertex indices)
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
    
    function project(point: number[]): [number, number] {
      // Apply rotations
      const cosX = Math.cos(cube.rotationX);
      const sinX = Math.sin(cube.rotationX);
      const cosY = Math.cos(cube.rotationY);
      const sinY = Math.sin(cube.rotationY);
      const cosZ = Math.cos(cube.rotationZ);
      const sinZ = Math.sin(cube.rotationZ);
      
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
      
      // Rotate around Z axis
      let x3 = x2 * cosZ - y1 * sinZ;
      let y3 = x2 * sinZ + y1 * cosZ;
      
      // Project to 2D (perspective projection)
      const scale = cube.distance / (cube.distance + z2);
      const projectedX = x3 * scale + canvas.width / 2;
      const projectedY = y3 * scale + canvas.height / 2;
      
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
      
      // Draw edges
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
      requestAnimationFrame(animate);
      
      if (cube.autoRotate) {
        cube.rotationX += 0.003;
        cube.rotationY += 0.005;
      }
      
      drawCube();
    }
    
    // Mouse drag events to rotate the cube
    canvas.addEventListener("mousedown", (e) => {
      cube.isDragging = true;
      cube.autoRotate = false;
      cube.lastMouseX = e.clientX;
      cube.lastMouseY = e.clientY;
    });
    
    window.addEventListener("mouseup", () => {
      cube.isDragging = false;
    });
    
    window.addEventListener("mousemove", (e) => {
      if (cube.isDragging) {
        const deltaX = e.clientX - cube.lastMouseX;
        const deltaY = e.clientY - cube.lastMouseY;
        
        cube.rotationY += deltaX * 0.005;
        cube.rotationX += deltaY * 0.005;
        
        cube.lastMouseX = e.clientX;
        cube.lastMouseY = e.clientY;
      }
    });
    
    // Touch events for mobile
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        cube.isDragging = true;
        cube.autoRotate = false;
        cube.lastMouseX = e.touches[0].clientX;
        cube.lastMouseY = e.touches[0].clientY;
      }
    });
    
    window.addEventListener("touchend", () => {
      cube.isDragging = false;
    });
    
    window.addEventListener("touchmove", (e) => {
      if (cube.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - cube.lastMouseX;
        const deltaY = e.touches[0].clientY - cube.lastMouseY;
        
        cube.rotationY += deltaX * 0.005;
        cube.rotationX += deltaY * 0.005;
        
        cube.lastMouseX = e.touches[0].clientX;
        cube.lastMouseY = e.touches[0].clientY;
      }
    });
    
    // Start animation
    animate();
    
    return () => {
      canvas.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
      window.removeEventListener("mousemove", () => {});
      canvas.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchend", () => {});
      window.removeEventListener("touchmove", () => {});
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
