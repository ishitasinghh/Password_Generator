import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [length, setlength] = useState(8);
	const [numberallowed, setNumber] = useState(false);
	const [charallowed, setChar] = useState(false);
	const [password, setPassword] = useState("");

	const copypass = useCallback(() => {
		password.current?.select();
		window.navigator.clipboard.writeText(password);
	}, [password]);

	const passwordgenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwqyz";
		if (numberallowed) str += "0123456789";
		if (charallowed) str += "!@#$%^&*(){}~`_-+={}[]";
		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, numberallowed, charallowed]);
	useEffect(() => {
		passwordgenerator();
	}, [length, numberallowed, charallowed, passwordgenerator]);

	return (
		<>
			<div className="container">
				<h1 className="heading">Password Generator</h1>
				<div className="box">
					<input
						type="text"
						value={password}
						className="passwordtext"
						placeholder="Password"
						readOnly
					/>
					<button className="button" onClick={copypass}>
						Copy
					</button>
				</div>
				<div className="line2">
					<div className="range">
						<input
							type="range"
							min={8}
							max={50}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setlength(e.target.value);
							}}
						/>
						<label>Length:{length}</label>
					</div>
					<div className="number">
						<input
							type="checkbox"
							defaultChecked={numberallowed}
							id="numberInput"
							onChange={() => {
								setNumber((prev) => !prev);
							}}
						/>
						<label>Numbers</label>
					</div>
					<div className="character">
						<input
							type="checkbox"
							defaultChecked={charallowed}
							id="characterInput"
							onChange={() => {
								setChar((prev) => !prev);
							}}
						/>
						<label>Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
