export default function Die(props) {
    return (<div className={`die ${props.isHeld ? "green" : ""}`} onClick={props.onHold}>
        <span class="die--dot"></span>
        { props.value >= 2 && <span class="die--dot"></span> }
        { props.value >= 3 && <span class="die--dot"></span> }
        { props.value >= 4 && <span class="die--dot"></span> }
        { props.value >= 5 && <span class="die--dot"></span> }
        { props.value >= 6 && <span class="die--dot"></span> }
    </div>)
}