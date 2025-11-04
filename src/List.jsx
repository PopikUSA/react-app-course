import {} from "react";

const items = [
  {
    task: "Learn react",
    icon: "<3",
    isCompleted: true,
  },
  {
    task: "Consolidate JavaScript ",
    icon: "<3",
    isCompleted: true,
  },
  {
    task: "Dont forget about English",
    icon: "<3",
    isCompleted: false,
  },
];

export const List = () => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? "completed" : ""}>
            <span>{item.icon}</span>
            <h4>{item.task}</h4>
          </section>
        );
      })}
    </div>
  );
};
