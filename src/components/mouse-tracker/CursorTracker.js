// Client-side code (e.g., in a React component)

import { useEffect, useState } from "react";

const CursorTracker = () => {
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/api/websocket");

    ws.onmessage = event => {

      const data = JSON.parse(event.data);
      setCursors(prevCursors => ({
        ...prevCursors,
        [data.userId]: { x: data.x, y: data.y }

      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMouseMove = event => {
    const { clientX: x, clientY: y } = event;
    const data = { userId: "unique_user_id", x, y }; // Provide a unique user ID
    ws.send(JSON.stringify(data));
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {Object.keys(cursors).map(userId => (
        <div
          key={userId}
          style={{
            
            position: "absolute",
            left: cursors[userId].x,
            top: cursors[userId].y 
          
          }}
        >
          {/* Render cursor for each user */}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;
