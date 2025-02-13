import { useApp } from "@/lib/AppStore";

const EditUserForm = () => {
  const { itemToEdit } = useApp((state) => state);

  return (
    <div>
      <p>
        Editing User: {itemToEdit?._id}, {itemToEdit?.staffName}
      </p>
    </div>
  );
};
export default EditUserForm;
