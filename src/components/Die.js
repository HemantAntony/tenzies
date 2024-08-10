export default function Die(props) {
    return (<div className={`die ${props.isHeld ? "green" : ""}`} onClick={props.onHold}>
        <h2 className="die--text">{props.value}</h2>
    </div>)
}