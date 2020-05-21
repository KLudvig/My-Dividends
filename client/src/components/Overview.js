import React from 'react';


export const Overview = (props) => {

//Calculates dividends
  const totalYield = props.stocks.map(data => Math.round(data.shares * data.dividend))
  const yearYield = Math.round(totalYield.reduce((total, num) => total + num, 0))
  const monthYield = Math.round(yearYield/12)
  const dayYield = Math.round(yearYield/365)
  const hourYield = (dayYield/24).toFixed(1)

  return (
    <>
      <div className="overview">
        <div className="month">
          <span style={{display:"block"}}>Month</span>
          <span className="mAmount">{monthYield}</span><span> $</span>
        </div>
          <table>
            <tbody>
              <tr>
                <th>Year</th>
                <th>Day</th> 
                <th>Hour</th>
              </tr>
              <tr>
                <td>{yearYield} $</td>
                <td>{dayYield} $</td>
                <td>{hourYield} $</td>
              </tr>
            </tbody>
          </table>
      </div>
      <span className="title-portfolio">My portfolio</span>
    </>
  )
}