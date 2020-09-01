import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core/'
const DummyTable = (): JSX.Element => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // make an api request for an http://localhost:3000/api/table endpoint
    const url = 'http://localhost:3000/api/table'
    const accessToken = localStorage.getItem('ddnxt:token')
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.rows && result.rows.length > 0) {
          setTableData(result.rows)
        }
      })
  }, [])

  const handleDelete = (item, index) => {
    if (confirm(`Do you really remove the ${item.title}?`)) {
      tableData.splice(index, 1)
    }
    setTableData([...tableData])
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 &&
            tableData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Button
                    style={{ color: 'red', borderWidth: 1, borderColor: 'red', borderStyle: 'outset' }}
                    onClick={() => handleDelete(item, index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DummyTable
