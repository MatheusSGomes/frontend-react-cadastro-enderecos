
const Title = (props) => {
  return (
    <div>
      <h2 className="mt-4">{props.children}</h2>
      <hr />
    </div>
  );
}

export default Title;