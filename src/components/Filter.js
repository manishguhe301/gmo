import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';

const data = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const Filter = () => {
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

  const handleExpand = (department) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [department]: !prevExpanded[department],
    }));
  };

  const handleSelect = (department, subDepartment) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (subDepartment) {
        // Select sub-department
        newSelected[department] = newSelected[department] || {};
        newSelected[department][subDepartment] =
          !newSelected[department][subDepartment];
        // Select parent department if all sub-departments are selected
        if (
          data
            .find((item) => item.department === department)
            .sub_departments.every(
              (subDept) => newSelected[department][subDept]
            )
        ) {
          newSelected[department].selected = true;
        } else {
          newSelected[department].selected = false;
        }
      } else {
        // Select department
        newSelected[department] = newSelected[department] || {};
        newSelected[department].selected = !newSelected[department].selected;
        // Select all sub-departments
        data
          .find((item) => item.department === department)
          .sub_departments.forEach((subDept) => {
            newSelected[department][subDept] = newSelected[department].selected;
          });
      }
      return newSelected;
    });
  };

  return (
    <div className='container'>
      <h3 style={{ marginTop: '30px' }}>Checkbox Filter</h3>
      <List className='root'>
        {data.map((item) => (
          <React.Fragment key={item.department}>
            <ListItem button onClick={() => handleExpand(item.department)}>
              <Checkbox
                checked={selected[item.department]?.selected || false}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelect(item.department);
                }}
              />
              <ListItemText primary={item.department} />
              {expanded[item.department] ? '-' : '+'}
            </ListItem>
            <Collapse
              in={expanded[item.department]}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {item.sub_departments.map((subDept) => (
                  <ListItem
                    key={subDept}
                    button
                    className='nested'
                    onClick={() => handleSelect(item.department, subDept)}
                  >
                    <Checkbox
                      checked={selected[item.department]?.[subDept] || false}
                      onChange={() => handleSelect(item.department, subDept)}
                    />
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Filter;
