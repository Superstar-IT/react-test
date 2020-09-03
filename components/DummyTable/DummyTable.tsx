import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, Modal, TextField } from '@material-ui/core/'
const DummyTable = (): JSX.Element => {
  const [tableData, setTableData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [delID, setDeleteID] = useState('')
  const [delTitle, setDeleteTitle] = useState('')

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

  const deleteTableItem = () => {
    if (delID) {
      setTableData(tableData.filter((item) => item.id !== delID))
      setModalOpen(!modalOpen)
      setDeleteID('')
    } else if (delTitle) {
      setTableData(tableData.filter((item) => item.title !== delTitle))
      setModalOpen((prevState) => !prevState)
      setDeleteTitle('')
    }
  }

  return (
    <>
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
              tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Button
                      style={{ color: 'red', borderWidth: 1, borderColor: 'red', borderStyle: 'outset' }}
                      onClick={() => setModalOpen(true)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ backgroundColor: 'white', padding: 30 }}>
          <h3>Are you really want to delete this item?</h3>
          <p>Enter item title or id</p>
          <div>
            <TextField value={delID} onChange={(event) => setDeleteID(event.target.value)} placeholder="Item id" />
            <Button
              type="button"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={() => deleteTableItem()}
            >
              Delete
            </Button>
          </div>
          <div>
            <TextField
              value={delTitle}
              onChange={(event) => setDeleteTitle(event.target.value)}
              placeholder="Item title"
            />
            <Button
              type="button"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={() => deleteTableItem()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DummyTable
