const DeclineModal = (props) => {
  return (
    <>
      <div
        className="w-full h-full bg-black opacity-75 absolute top-0 left-0 z-10"
        onClick={props.closeHandler}
      ></div>
      <div className="absolute z-50 top-[25%] left-[25%] w-[50%] h-[60%]  bg-white rounded-md">
        <h1 className="w-full py-2 px-3 bg-blue-600 text-white text-lg font-bold">
          {props.title}
        </h1>
        <div className="h-[100%] overflow-auto">{props.children}</div>
      </div>
    </>
  );
};
export default DeclineModal;
