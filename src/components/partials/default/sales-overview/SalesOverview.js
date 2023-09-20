import React from "react";
import { DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../Component";
import { LineChart } from "../../charts/default/Charts";

const SalesOverview = () => {
  return (
    <React.Fragment>
      <div className="card-title-group align-start gx-3 mb-3">
        <div className="card-title">
          <h6 className="title">Total Revenue</h6>
          <p>
            In 30 days.{" "}
          </p>
        </div>
      </div>
      <div className="nk-sale-data-group align-center justify-between gy-3 gx-5">
        <div className="nk-sale-data">
          <span className="amount">$82,944.60</span>
        </div>

      </div>
      <div className="nk-sales-ck large pt-4">
        <LineChart />
      </div>
    </React.Fragment>
  );
};
export default SalesOverview;
