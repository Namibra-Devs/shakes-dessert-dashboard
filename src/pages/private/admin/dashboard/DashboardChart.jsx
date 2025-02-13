import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { foodData } from "@/lib/FoodData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const BarChart = () => {
  const calculateTripsByMonth = (foodData, foodType) => {
    const currentYear = new Date().getFullYear();
    const foodCounts = Array(12).fill(0);

    foodData?.forEach((food) => {
      const foodDate = new Date(food.createdAt);
      const foodYear = foodDate.getFullYear();
      const foodMonth = foodDate.getMonth();

      if (foodYear === currentYear && food.foodType === foodType) {
        foodCounts[foodMonth] += 1;
      }
    });

    return foodCounts;
  };

  const snacks = calculateTripsByMonth(foodData, "snack");
  const drinks = calculateTripsByMonth(foodData, "drink");

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Snacks",
        data: snacks,
        backgroundColor: "#386CAA",
        borderWidth: 1,
      },
      {
        label: "Drinks",
        data: drinks,
        backgroundColor: "#4A90E2",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[900px] sm:w-[100%] h-[40vh] lg:h-[45vh]">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
