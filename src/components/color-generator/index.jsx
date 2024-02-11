import { useEffect, useState, useCallback } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  const handleCreateRandomHexColor = useCallback(() => {
    // #678765
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }, []);

  const handleCreateRandomRgbColor = useCallback(() => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    setColor(`rgb(${r},${g}, ${b})`);
  }, []);

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRgbColor();
    else handleCreateRandomHexColor();
  }, [handleCreateRandomHexColor, handleCreateRandomRgbColor, typeOfColor]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: color,
      }}
    >
      <button
        className={`px-5 py-5 mt-10 mx-5 font-semibold text-xl rounded bg-white ${
            typeOfColor === "hex" ? "scale-125": "scale-100"
          }`}
        onClick={() => setTypeOfColor("hex")}
      >
        HEX Color
      </button>
      <button
        className={`px-5 py-5 mt-10 mx-5 font-semibold text-xl rounded bg-white ${
            typeOfColor === "rgb" ? "scale-125": "scale-100"
          }`}
        onClick={() => setTypeOfColor("rgb")}
      >
        RGB Color
      </button>
      <button
        className="bg-white px-5 py-5 mt-10 mx-5 font-semibold rounded text-xl"
        onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHexColor
            : handleCreateRandomRgbColor
        }
      >
        Generate {typeOfColor} Color
      </button>
      <div className="flex justify-center items-center text-white text-6xl mt-40 flex-col gap-4">
        <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
