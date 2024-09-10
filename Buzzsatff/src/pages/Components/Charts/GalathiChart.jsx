import { useEffect, useState } from 'react';
import "./glatharichart.css"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
const COLORS = ['#454545', '#e2e3c8', '#cdd0ae', '#9c9e7f','#656755'];
const GalathiChart = (props) => {
    const [data,setData]= useState(props.data)
    const sum = data.reduce((acc, curr) => acc + curr.value, 0);
    if (sum === 0) {
      return <p style={{alignContent:"center",marginLeft:"30%",marginTop:"20%"}}>No Chart Data </p>;
    }
  return (
    <div className="chart-container" style={{display:"flex"}}>
      <ResponsiveContainer  width="100%" height="auto" aspect={1.6}>
        <PieChart  style={{float: 'left'}}>
          <Pie
            data={data}
            innerRadius={"60%"}
            outerRadius={"80%"}
            fill="#8884d8"
           
            
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
          <Legend style={{maxwidth:"30wh"}} layout="vertical" verticalAlign="middle" align="right" />
          <Tooltip  
            isAnimationActive={false}
            cursor={{fill: 'transparent', border: 'none',backgroundColor: 'none',}}
            contentStyle={{
              backgroundColor: '#fff',
              boxShadow: 'none',
              border: '0px',
              borderRadius: '10px',
              
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
            
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default GalathiChart;