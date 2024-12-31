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
 
 

    const [characterError, setCharacterError] = useState(false);  // Add this line

    const handleGenerate = async () => {
      setShowError(false);
      setLoading(true);
      setGenerationFailed(false);
      setCharacterError(false);  
      if (!prompt) {
        setShowError(true);
        setLoading(false);
        return;
      }
    
      if (selection === "character" && !characterName) {
        setCharacterError(true);  // Set character error if no character is selected
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
        setGenerationFailed(true);
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
      backgroundColor: "rgba(250, 255, 201, 0.94)",
      minHeight: "95.5vh",
      // fontFamily: "Arial, sans-serif", 
      fontFamily: "Lobster, cursive",

    },
    appHeader: {
      fontSize: "3rem",
      marginBottom: "-10px",
      color: "rgb(0, 89, 255)",
      textAlign: "center",
      fontWeight: "bold",
    },
    description: {
      fontSize: "1.18rem",
      color: "rgb(0, 89, 255)",
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
      display: "flex",
      flexDirection: "column",
      height: "100%", 
      borderRadius: "25px",
      // borderBottom: "10px solid rgb(0, 89, 255)", 
      // borderLeft: "10px solid rgb(0, 89, 255)", 
      // boxShadow: "0 0 10px rgb(252, 255, 77)", 
    },

    rightSide: {
      width: "60%",
      padding: "20px",
      backgroundColor: "rgb(0, 89, 255)", 
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",  
      borderRadius: "25px",
      borderTop: "10px solid rgb(252, 255, 77)",   
      borderRight: "10px solid rgb(252, 255, 77)",    
      boxShadow: "0 0 10px rgb(0, 89, 255)",  
    }, 
    header: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "rgb(0, 89, 255)",
      fontWeight: "bold",
    },
    rightHeader: { 
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "rgb(219, 220, 187)",
      fontWeight: "bold",
    },
    radioGroup: {
      marginBottom: "20px",
    }, 
    radioLabel: {
      marginRight: "10px",
      fontSize: "1.4rem",
      fontWeight: "bold", 
      color: "rgb(0, 89, 255)",
    },
    radioInput: {
      transform: "scale(1.7)", 
      marginRight: "10px",  
    },
    section: {
      marginBottom: "15px",
    },
    sectionHeading: {
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "rgb(0, 89, 255)",
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
      width: "96%",
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
      fontSize: "1.4rem",
      backgroundColor: "rgb(0, 89, 255)",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }, 
    image: (width, height, isBackground) => ({
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: "100%",
      maxHeight: "100%",
      border: isBackground ? "5px solid" : "none",  
      boxShadow: "0px 0px 40px rgb(0, 204, 255)",  
      borderRadius: "15px"
    }), 
    placeholder: {
      fontSize: "1.2rem",
      color: "rgb(219, 220, 187)",
    },  
    loading: {
      fontSize: "1.5rem",
      color: "rgb(254, 255, 174)",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }, 
    retryButton: {
      padding: "10px 20px",
      fontSize: "1.1rem",
      backgroundColor: "#dc3545",
      color: "rgb(254, 255, 174)",
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
      <h1 style={{ ...styles.appHeader, fontFamily: "Arial, sans-serif" }}>BOARDZ APP</h1> 
      {/* <h1 style={styles.appHeader}>BOARDZ APP</h1> */}
      <p style={styles.description}>
      Generate AI-powered storyboards, sketch characters and environments, and bring prompts to life—streamline your creative storytelling process effortlessly!
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
                style={styles.radioInput} // Apply the new style here
              />
              Environment
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="character"
                checked={selection === "character"}
                onChange={() => setSelection("character")}
                style={styles.radioInput} // Apply the new style here
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
                <option value="">Select a character</option>
                <option value="charctr_cby">Character CBY</option>
                <option value="charctr_cgl">Character CGL</option>
                <option value="charctr_omn">Character OMN</option>
              </select>
              {characterError && <span style={styles.errorMessage}>Please select a character!</span>} 
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
          <h2 style={styles.rightHeader}>
            {loading ? "Generating..." : image ? "Generated Image" : "click 'Generate' to start the creative process and let the AI craft a sketch based on your prompt!"}
          </h2>
          {loading ? (
            <div style={styles.loading}>
              {/* <p style={{ marginRight: '11px' }}></p> */}
              <div className="bouncing-balls">
                <div className="bouncing-ball"></div>
                <div className="bouncing-ball"></div>
                <div className="bouncing-ball"></div>
                <div className="bouncing-ball"></div>
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


 

