import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("");
  const inventoryData = [
    {
      item: "Leather Jacket",
      sku: "LJ1234",
      quantity: 100,
      location: "Warehouse A",
      lastUpdated: "2023-06-01",
    },
    {
      item: "Denim Jeans",
      sku: "DJ5678",
      quantity: 200,
      location: "Warehouse B",
      lastUpdated: "2023-06-02",
    },
    {
      item: "Cotton T-Shirt",
      sku: "CT9012",
      quantity: 500,
      location: "Warehouse C",
      lastUpdated: "2023-06-03",
    },
  ];

  const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const itemsByCategory = inventoryData.reduce((categories, item) => {
    const category = item.item.split(" ")[0];
    categories[category] = (categories[category] || 0) + item.quantity;
    return categories;
  }, {});
  const itemsByLocation = inventoryData.reduce((locations, item) => {
    locations[item.location] = (locations[item.location] || 0) + item.quantity;
    return locations;
  }, {});
  const reorderAlerts = inventoryData.filter((item) => item.quantity < 50).length;

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleExport = () => {
    // Logic to export data
    console.log("Exporting data...");
  };

  const filteredData = inventoryData.filter((item) => item.item.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Inventory Management</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(itemsByCategory).map(([category, count]) => (
              <p key={category}>
                {category}: {count}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items by Location</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(itemsByLocation).map(([location, count]) => (
              <p key={location}>
                {location}: {count}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reorder Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reorderAlerts}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <Input type="text" placeholder="Filter items..." value={filter} onChange={handleFilter} className="mr-4 max-w-xs" />
        <Button onClick={handleExport}>Export</Button>
      </div>
      <Table>
        <TableCaption>Inventory Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
