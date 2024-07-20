import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
} from "react-native";

import { View } from "react-native";

interface IApSegmentProps {
  selectActive: (index: number) => void;
}

interface Item {
  label: string;
  key: string;
  disabled?: boolean;
  disableReason?: string;
  children?: (props: IApSegmentProps) => void | React.ReactNode | any;
}

interface IProps {
  selectedIndex?: number | undefined;
  items: Array<Item>;
  isStepper?: boolean;
  containerClassName?: string | undefined;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export const CSegment: React.FC<IProps> = ({
  selectedIndex,
  isStepper,
  containerStyle,
  items,
  labelStyle,
  onSelect,
  headerStyle,
  contentStyle,
  containerClassName,
}) => {
  if (selectedIndex && selectedIndex > items.length) {
    throw new Error("selected index out of range");
  }

  const [active, setActive] = useState<Item>(
    !!items?.length && (items[selectedIndex || 0] as any)
  );

  useEffect(() => {
    setActive(items[selectedIndex || 0]);
  }, [selectedIndex]);

  const selectActive = useCallback(
    (index: number) => {
      setActive(items[index]);
      if (onSelect) onSelect(index);
    },
    [active]
  );

  const handlePress = (item: Item, index: number) => {
    !item?.disabled && selectActive(index);
  };

  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <View
        style={[styles.container, headerStyle]}
        className={containerClassName}
      >
        {items?.map((item, i) => (
          <TouchableOpacity
            className=""
            style={[
              styles.btn,
              isStepper
                ? +active?.key > i
                  ? styles.active
                  : null
                : active?.key === item.key
                ? styles.active
                : null,
            ]}
            key={i}
            onPress={() => handlePress(item, i)}
          >
            <Text
              className="font-psemibold text-sm p-2"
              style={[
                styles.label,
                labelStyle,
                item.key === active?.key ? styles.label_active : null,
              ]}
            >
              {item?.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[contentStyle]}>
        {typeof active?.children === "function"
          ? active?.children({ selectActive })
          : (active?.children as any)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,

    borderRadius: 5,
    marginVertical: 10,
  },
  active: {
    backgroundColor: "#ffa001",
    borderRadius: 6,
  },
  label: {
    color: "#fff",
    textAlign: "center",
  },
  label_active: {
    color: "#fff",
  },
  btn: {
    flex: 1,
    padding: 10,
  },
});
