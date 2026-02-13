import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./App.css";

const statuses = [
  { text: "Single but strong 💪", video: "/videos/meme1.mp4" },
  { text: "Friend-zoned specialist 😂", video: "/videos/meme2.mp4" },
  { text: "Crush doesn't know you exist 👀", video: "/videos/meme3.mp4" },
  { text: "Secret admirer watching you 👀💖", video: "/videos/meme4.mp4" },
];

export default function App() {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Single"); // default
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const singleVideos = ["/videos/s1.mp4", "/videos/s2.mp4"];

  const committedVideos = ["/videos/c1.mp4"];

  const singleMessages = [
    "Single but strong 💪",
    "Friend-zoned specialist 😂",
    "Crush doesn't know you exist 👀",
  ];

  const committedMessages = [
    "Love is in the air 💖",
    "Couple goals unlocked 💑",
    "Forever together vibes ✨",
  ];
  const checkStatus = async () => {
    if (!name.trim()) return alert("Enter your name 💌");

    setLoading(true);

    setTimeout(async () => {
      let selectedVideos;
      let selectedMessages;

      if (relationship === "Single") {
        selectedVideos = singleVideos;
        selectedMessages = singleMessages;
      } else {
        selectedVideos = committedVideos;
        selectedMessages = committedMessages;
      }

      const randomVideo =
        selectedVideos[Math.floor(Math.random() * selectedVideos.length)];

      const randomMessage =
        selectedMessages[Math.floor(Math.random() * selectedMessages.length)];

      const finalResult = {
        text: randomMessage,
        video: randomVideo,
      };

      setResult(finalResult);

      try {
        await axios.post("http://localhost:5000/save", {
          name,
          relationship,
          valentineResult: randomMessage,
        });
      } catch (err) {
        console.log("Error saving:", err.message);
      }

      setLoading(false);
    }, 2500);
  };

  return (
    <div className="main-wrapper">
      {/* Floating Background Hearts */}
      <div className="floating-hearts">
        <span>💖</span>
        <span>💘</span>
        <span>💕</span>
        <span>💓</span>
        <span>💗</span>
      </div>

      <motion.div
        className="card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="corner-heart">💖</div>

        <div className="header">
          <h1>
            Valentine Status
            <span className="title-hearts"> 💕 💘 💓 </span>
          </h1>
        </div>

        {!result && (
          <>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Relationship Select */}
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="select"
            >
              <option value="Single">Single</option>
              <option value="Committed">Committed</option>
            </select>

            <button onClick={checkStatus}>Check My Status</button>
          </>
        )}

        {result && (
          <motion.div
            className="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="entered-name">{name} 💌</h2>

            <p>
              <strong>Relationship:</strong> {relationship}
            </p>

            <p className="status">{result.text}</p>

            <video src={result.video} controls autoPlay className="video" />

            <button className="retry" onClick={() => setResult(null)}>
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader-box">
              <div className="moving-heart">💓</div>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <p>Checking your love destiny...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
