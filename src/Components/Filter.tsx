const Filter = (props: any) => {
  const handleFilterChange = (newFilter: string) => {
    props.setActiveFilter(newFilter);
  };

  return (
    <div>
      <button
        onClick={() => handleFilterChange("simple")}
        className={`${props.activeFilter === "simple" ? "active-filter" : ""}`}
      >
        Simple
      </button>
      <button
        onClick={() => handleFilterChange("custom")}
        className={`${props.activeFilter === "custom" ? "active-filter" : ""}`}
      >
        Custom
      </button>
      <button
        onClick={() => handleFilterChange("advanced")}
        className={`${
          props.activeFilter === "advanced" ? "active-filter" : ""
        }`}
      >
        Advanced
      </button>
    </div>
  );
};

export default Filter;
