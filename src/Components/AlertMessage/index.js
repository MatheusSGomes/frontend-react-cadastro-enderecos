
const AlertMessage = (props) => {
  if (props.message !== undefined) {
    return (
      <div 
        className={`alert alert-${props.type} alert-dismissible fade show`} 
        role="alert">
        <p>{props.message}</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );
  }
}

export default AlertMessage;