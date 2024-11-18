import React, { useState } from 'react';
import KnapsackSolver from './KnapsackSolver'; // Importer la classe
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function App() {
  const [maxWeight, setMaxWeight] = useState('');
  const [items, setItems] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [result, setResult] = useState(null);

  const handleAddItem = () => {
    if (currentWeight && currentValue) {
      setItems([...items, { weight: parseInt(currentWeight, 10), value: parseInt(currentValue, 10) }]);
      setCurrentWeight('');
      setCurrentValue('');
    }
  };

  const handleSolve = () => {
    const weights = items.map(item => item.weight);
    const values = items.map(item => item.value);
    const parsedMaxWeight = parseInt(maxWeight, 10);

    const solver = new KnapsackSolver(parsedMaxWeight, values, weights);
    const solution = solver.solve();

    const tableData = values.map((value, index) => ({
      id: index + 1,
      weight: weights[index],
      value,
      selected: solution.selection[index] === 1,
    }));

    setResult({ ...solution, tableData });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Résolveur de Sac à Dos
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <TextField
            label="Poids Maximum"
            type="number"
            variant="outlined"
            fullWidth
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
            margin="normal"
          />

          <Typography variant="h6" sx={{ mt: 3 }}>
            Ajouter un objet
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Poids"
              type="number"
              variant="outlined"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
            <TextField
              label="Valeur"
              type="number"
              variant="outlined"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddItem}
              disabled={!currentWeight || !currentValue}
            >
              Ajouter objet
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Objets ajoutés
          </Typography>
          {items.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Poids</strong></TableCell>
                    <TableCell><strong>Valeur</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSolve}
            style={{ marginTop: '20px' }}
            disabled={items.length === 0 || !maxWeight}
          >
            Résoudre
          </Button>
        </Box>

        {result && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Résultat
            </Typography>
            <Typography>
              <strong>Valeur Maximale :</strong> {result.maxValue}
            </Typography>
            <Typography>
              <strong>Poids Total :</strong> {result.weight}
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Poids</strong></TableCell>
                    <TableCell><strong>Valeur</strong></TableCell>
                    <TableCell><strong>Sélectionné</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.tableData.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        backgroundColor: item.selected ? 'rgba(144, 238, 144, 0.5)' : 'inherit',
                      }}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.selected ? 'Oui' : 'Non'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
