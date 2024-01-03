
const Input = (props) =>{
    return (
        <>
        <label className="m-1 form-label" htmlFor={props.id}>{props.label}</label>
        <input className="m-1 form-control" placeholder={props.placeholder? props.placeholder : ""} type={props.type} value={props.value} onChange={props.onChange}
         id={props.id} name={props.id}/>
        </>
    )
}
export default Input;