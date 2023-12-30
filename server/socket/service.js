const chatRooms = {};

function initializeSocketIO(io) {
  io.on("connection", (socket) => {
    console.log("Socket established");

    socket.on("create_room", (data) => {
      const { room_code, user_id, price, join_fee, player_count } = data;

      if (chatRooms[room_code]) {
        socket.emit("create_room_failed", {
          room_code: room_code,
          message: "Failed to create room. Room already exists.",
        });
        return;
      }

      if (!room_code || room_code.trim() === '') {
        socket.emit("create_room_failed", {
          room_code: room_code,
          message: "Failed to create room. Room code is required.",
        });
        return;
      }

      socket.emit("created_room", {
        room_code: room_code,
        master_user_id: user_id, // Assuming the user creating is the master user
        message: `Room ${room_code} created successfully!`,
      });

      chatRooms[room_code] = {
        master_user_id: user_id,
        users: [user_id],
        // Other room-specific data as needed
      };
    });

    socket.on("join_room", (data) => {
      const { room_code, user_id, price, join_fee, player_count } = data;

      if (!chatRooms[room_code]) {
        socket.emit("join_room_failed", {
          room_code: room_code,
          message: "Failed to join room. Room does not exist.",
        });
        return;
      }

      // Any specific checks before joining (e.g., room capacity, user authorization, etc.)

      chatRooms[room_code].users.push(user_id);

      socket.emit("join_room_success", {
        room_code: room_code,
        user_id: user_id,
        message: `Joined room ${room_code} successfully!`,
      });

    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = {
  initializeSocketIO,
};
