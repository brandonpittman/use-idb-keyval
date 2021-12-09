import logo from "./logo.svg";
import "./App.css";
import { useIdbKeyval } from "use-idb-keyval";

function App() {
	const [value, setValue, resetValue] = useIdbKeyval("name", "");

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div style={{ paddingTop: "2rem" }}>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<div
						style={{
							opacity: value ? 1 : 0,
							transition: "opacity 150ms ease",
						}}
					>
						{value ? <p>{value}</p> : <p>&nbsp;</p>}
						<button onClick={resetValue}>Reset</button>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
