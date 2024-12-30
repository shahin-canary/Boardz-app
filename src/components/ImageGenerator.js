import React, { useState } from "react";
import axios from "axios";

import "../App.css"

const ImageGenerator = () => {
  const [selection, setSelection] = useState("environment");
  const [characterName, setCharacterName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);  // New state for generation failure
 
   // Declare token from environment variable
   const token = process.env.REACT_APP_env_token;
   console.log(token); // This should now work fine
 

  const handleGenerate = async () => {
    setShowError(false);
    setLoading(true); 
    setGenerationFailed(false);  // Reset failure state

    if (!prompt) {
      setShowError(true);
      setLoading(false);
      return;
    }

    if (selection === "character" && !characterName) {
      setShowError(true);
      setLoading(false);
      return;
    }

    let url = "";
    let requestData = {};

    if (selection === "environment") {
      url = "https://infer.e2enetworks.net/project/p-4290/endpoint/is-3253/generate_background";
      requestData = {
        generate: {
          background: {
            bg_prompt: prompt,
          },
        },
      };
    } else if (selection === "character") {
      url = "https://infer.e2enetworks.net/project/p-4290/endpoint/is-3253/generate_character";
      requestData = {
        generate: {
          character: {
            character_name: characterName,
            character_prompt: prompt,
          },
        },
      };
    }

    try {
      const response = await axios.post(url, requestData, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const imageBlob = new Blob([response.data], { type: "image/png" });
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
    } catch (error) {
      console.error("Error generating image:", error);
      setGenerationFailed(true);  // Set generation failed state
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#e6e6e6",
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
    },
    appHeader: {
      fontSize: "3rem",
      marginBottom: "-10px",
      color: "#333",
      textAlign: "center",
      fontWeight: "bold",
    },
    description: {
      fontSize: "1.2rem",
      color: "#333",
      textAlign: "center",
      marginBottom: "40px",
      maxWidth: "80%",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      width: "90%",
      gap: "20px",
      height: "600px",
    },
    leftSide: {
      width: "40%",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    rightSide: {
      width: "60%",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    header: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "#333",
      fontWeight: "bold",
    },
    radioGroup: {
      marginBottom: "20px",
    },
    radioLabel: {
      marginRight: "10px",
      fontSize: "1.2rem",
      color: "#333",
    },
    section: {
      marginBottom: "20px",
    },
    sectionHeading: {
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "#333",
    },
    select: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      outline: "none",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      marginBottom: "5px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      outline: "none",
    },
    errorMessage: {
      fontSize: "0.9rem",
      color: "red",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "1.1rem",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    },
    image: (width, height) => ({
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "8px",
      border: "4px solid #ddd",
    }),
    placeholder: {
      fontSize: "1.2rem",
      color: "gray",
    },  
    loading: {
      fontSize: "1.5rem",
      color: "#007bff",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }, 
    retryButton: {
      padding: "10px 20px",
      fontSize: "1.1rem",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px",
    }, 
  };

  const imageSize = selection === "environment" 
    ? { width: 984, height: 456 } 
    : { width: 500, height: 500 };

  return (
    <div style={styles.page}>
      <h1 style={styles.appHeader}>BOARDZ APP</h1>
      <p style={styles.description}>
        Generate AI-powered storyboards with quick sketches of characters, environments, and key scenes, streamlining the creative process.
      </p>
      <div style={styles.container}>
        <div style={styles.leftSide}>
          <h2 style={styles.header}>Image Generator</h2>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="environment"
                checked={selection === "environment"}
                onChange={() => setSelection("environment")}
              />
              Environment
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="character"
                checked={selection === "character"}
                onChange={() => setSelection("character")}
              />
              Character
            </label>
          </div>
          {selection === "character" && (
            <div style={styles.section}>
              <h2 style={styles.sectionHeading}>Character Selector</h2>
              <select
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                style={styles.select}
              > 
                <option value="charctr_cby">Character CBY</option>
                <option value="charctr_cgl">Character CGL</option>
                <option value="charctr_omn">Character OMN</option>
              </select>
            </div>
          )}
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>Enter Prompt</h2>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter the prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={styles.input}
              />
              {showError && !prompt && <span style={styles.errorMessage}>Please enter a prompt!</span>}
            </div>
          </div>
          <button onClick={handleGenerate} style={styles.button}>Generate</button>
        </div>
        <div style={styles.rightSide}>
        <h2 style={styles.header}>Generated Image</h2>  
        {loading ? (
          <div style={styles.loading}>
          <p style={{ marginRight: '11px'  }}>Loading</p>
          <div className="bouncing-balls">
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
            </div>
          </div>
        ) : image ? (
          <img src={image} alt="Generated" style={styles.image(imageSize.width, imageSize.height)} />
        ) : (
          generationFailed && (
            <div>
              <p style={styles.placeholder}>Generation failed. Try again.</p>
              <button onClick={handleGenerate} style={styles.retryButton}>Retry</button>
            </div>
          )
        )} 
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;


 

