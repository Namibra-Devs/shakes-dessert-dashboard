import { useApp } from "@/lib/AppStore";

const EditStockForm = () => {
  const { itemToEdit } = useApp((state) => state);

  return (
    <div>
      <p>
        Editing Stock Item: {itemToEdit?._id}, {itemToEdit?.itemName}
      </p>
    </div>
  );
};
export default EditStockForm;
