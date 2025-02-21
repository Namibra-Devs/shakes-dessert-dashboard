import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";
import { useState } from "react";
import { StockTable } from "./StockTable";
import EditModal from "@/components/EditModal";
import { useApp } from "@/lib/AppStore";
import StockDetailsModal from "./StockDetailsModal";
import { useStockStore } from "@/lib/PageStore";
import DeleteAlert from "@/components/DeleteAlert";

const Stock = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [stockItem, setStockItem] = useState(null);
  const [stockId, setStockId] = useState(null);
  const [viewModalState, setViewModalState] = useState("closed");
  const { setModalState, setItemToEdit, setDeleteModal, deleteModal } = useApp(
    (state) => state
  );
  const navigate = useNavigate();
  const { stocks } = useStockStore((state) => state);
  const totalCount = 30;

  const tabItems = [
    { tabName: "All", count: totalCount },
    {
      tabName: "Snacks",
      count: 20,
    },
    {
      tabName: "Drinks",
      count: 10,
    },
  ];

  const onViewClick = (stock) => {
    setStockItem(stock);
    setViewModalState("open");
  };

  const onEditClick = (stock) => {
    setItemToEdit(stock);
    setModalState("open");
  };

  const onDeleteClick = (Id) => {
    setStockId(Id);
    setDeleteModal(true);
  };

  return (
    <>
      <StockDetailsModal
        stockItem={stockItem}
        viewModalState={viewModalState}
        setViewModalState={setViewModalState}
      />
      <EditModal page={"Stock"} />
      <DeleteAlert
        page={"stock"}
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        itemId={stockId}
      />
      <div className="flex items-center justify-between">
        <h3 className="page_header">Stock Management</h3>
        <CustomButton
          label="Add Stock"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/stock/create")}
        />
      </div>
      {stocks &&
        (stocks.length > 0 ? (
          <>
            <ul className="flex flex-wrap items-center gap-1 mt-5 bg-gray-200 w-fit p-1 rounded-[10px]">
              {tabItems.map((item, index) => (
                <li
                  key={index}
                  role="tab"
                  aria-selected={activeTab === item.tabName}
                  onClick={() =>
                    activeTab !== item.tabName && setActiveTab(item.tabName)
                  }
                  className={`${
                    activeTab === item.tabName ? "bg-white" : "bg-transparent"
                  } w-fit p-2 rounded-[10px] text-[13px] flex items-center space-x-2 cursor-pointer`}
                >
                  <span className="capitalize">{item.tabName}</span>
                  <small
                    className={`w-8 h-5 rounded-full bg-primary_pink text-white flex items-center justify-center`}
                  >
                    {item.count < 99 ? item.count : "99+"}
                  </small>
                </li>
              ))}
            </ul>
            <div className="w-[395px] sm:w-full overflow-auto">
              <StockTable
                stocks={stocks}
                onViewClick={onViewClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-[70vh] gap-5">
            <img src={EmptyImage} alt="" />
            <p className="w-full sm:w-[50%] text-center text-dark">
              No stock added yet! Once you add new stock, they will appear here
              for tracking and updates.
            </p>
            <CustomButton
              label="Add Stock"
              variant="contained"
              icon={<Plus size={20} />}
              onClick={() => navigate("/dashboard/manage/stock/create")}
            />
          </div>
        ))}
    </>
  );
};
export default Stock;
