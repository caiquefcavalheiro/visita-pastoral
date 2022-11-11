import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

type OrderTypes = "order-alphabetical-ascending" | "order-numeric-ascending";

interface OrderButtonProps {
  defaultOrder?: "order-alphabetical-ascending" | "order-numeric-ascending";
  actions?: Record<number, () => void>;
}

const orders = ["order-alphabetical-ascending", "order-numeric-ascending"];

const OrderButton = ({
  defaultOrder = "order-alphabetical-ascending",
  actions,
}: OrderButtonProps) => {
  const [currentOrder, setCurrentOrder] = useState(defaultOrder);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(
    orders.findIndex((ele) => ele === defaultOrder)
  );

  const handlePress = () => {
    let newOrder = 0;
    if (currentOrderIndex < orders.length - 1) {
      newOrder = currentOrderIndex + 1;
    }
    setCurrentOrder(orders[newOrder] as OrderTypes);
    setCurrentOrderIndex(newOrder);

    actions?.[newOrder]?.();
  };

  return (
    <MaterialCommunityIcons
      name={currentOrder}
      size={30}
      onPress={handlePress}
    />
  );
};

export default OrderButton;
