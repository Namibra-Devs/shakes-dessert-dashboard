import PropTypes from "prop-types";

const InfoCard = ({ info }) => {
  const colorMappings = {
    default: {
      text: "text-dark",
      bg: "bg-dark/30",
    },
    products: {
      text: "text-primary_blue",
      bg: "bg-primary_blue/30",
    },
    branches: {
      text: "text-primary_pink",
      bg: "bg-primary_pink/30",
    },
    active_staff: {
      text: "text-success",
      bg: "bg-success/30",
    },
    inactive_staff: {
      text: "text-danger",
      bg: "bg-danger/30",
    },
    items: {
      text: "text-danger",
      bg: "bg-danger/30",
    },
    snacks: {
      text: "text-primary_blue",
      bg: "bg-primary_blue/30",
    },
    drinks: {
      text: "text-success",
      bg: "bg-success/30",
    },
  };

  const { bg, text } = colorMappings[info?.tag] || colorMappings["default"];

  return (
    <article className="shadow-md p-5 rounded-[1rem]">
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-600 text-center">{info?.title}</p>
        <div
          className={`${text} ${bg} w-10 h-10 rounded-full flex items-center justify-center`}
        >
          {info?.icon}
        </div>
      </div>
      <h5 className={`font-[400] text-[30px] ${text}`}>{info?.count}</h5>
    </article>
  );
};

InfoCard.propTypes = {
  info: PropTypes.object.isRequired,
};
export default InfoCard;
