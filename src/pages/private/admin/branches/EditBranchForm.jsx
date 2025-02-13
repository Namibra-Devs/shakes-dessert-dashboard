import { useApp } from "@/lib/AppStore";

const EditBranchForm = () => {
  const { itemToEdit } = useApp((state) => state);

  return (
    <div>
      <p>
        Editing Branch: {itemToEdit?._id}, {itemToEdit?.name}
      </p>
    </div>
  );
};
export default EditBranchForm;
