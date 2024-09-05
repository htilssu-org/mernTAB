import React, { useState,useEffect } from "react";
import { Input, DatePicker, Dropdown, Button, Row, Col,Grid } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCount } from "../../hooks/hooks";

const { RangePicker } = DatePicker;

const Booking = () => {
  // place to go

  // date picker
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");

  dayjs.extend(customParseFormat);
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day") ;
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDayStart(dates[0].format("YYYY-MM-DD"));
      setDayEnd(dates[1].format("YYYY-MM-DD"));
    } else {
      setDayStart(null);
      setDayEnd(null);
    }
  };
  // for the person
  const [aCount, aIncrement, aDecrement] = useCount(0);
  const [cCount,cIncrement,cDecrement]=useCount(0)
  const items = [
    {
      label: (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span>Adults</span>
            <div className="flex items-center">
              <Button
                onClick={aDecrement}
                size="small"
                className="mr-2"
                disabled={aCount === 0}
              >
                -
              </Button>
              <span>{aCount}</span>
              <Button
                onClick={aIncrement}
                size="small"
                className="ml-2"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="mr-4">Childrens</span>
            <div className="flex items-center">
              <Button
                onClick={cDecrement}
                size="small"
                className="mr-2"
                disabled={cCount === 0}
              >
                -
              </Button>
              <span>{cCount}</span>
              <Button
                onClick={cIncrement}
                size="small"
                className="ml-2"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ),
      key: "1",
    },
  ];
  

  return (
    <div
      className="flex absolute top-[73%] left-[20%] w-[60%] 
     bg-gray-100 border-4 border-yellow-400 rounded-lg 
     overflow-hidden h-20 items-center"
    >
      <Row gutter={0} className="w-full items-center">
        <Col span={6}>
          <Input
            placeholder="Where you want to go?"
            prefix={
              <img src="/icon/double-bed.png" alt="Bed Icon" className="" />
            }
            className="rounded-none h-16"
            bordered={false}
          />
        </Col>
        <Col span={8}>
          <RangePicker
            suffixIcon={<CalendarOutlined />}
            disabledDate={disabledDate}
            onChange={handleDateChange}
            className="rounded-none h-20 w-full"
            bordered={false}
          />
        </Col>
        <Col span={6}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            arrow
            placement="bottomRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-20 w-full rounded-none justify-center flex items-center">
              {aCount+cCount} People
            </div>
          </Dropdown>
        </Col>
        <Col span={4}>
          <Button type="primary" className="h-20 w-full rounded-none text-[18px]">
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Booking;
