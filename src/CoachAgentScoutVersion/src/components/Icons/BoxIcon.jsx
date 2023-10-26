const BoxIcon = ({ IconClassName, style }) => {
  return (
    <i
      style={style}
      className={`bx bx-md ${
        IconClassName ? IconClassName : ""
      } primaryTextColor `}
    ></i>
  );
};

export default BoxIcon;
