const connection = require("../db/connection");
const mySQL = require("mysql");

//Is there a good way to do this? What's the best practice here?
test("update records", () => {
  connection.query("SELECT * FROM departments LIMIT 1", function (err, result) {
    if (err) throw err;
    expect(result.length).toBe(1);
    connection.end();
  });
});

test("role table has records", () => {
  connection.query("SELECT * FROM roles LIMIT 1", function (err, result) {
    if (err) throw err;
    expect(result.length).toBe(1);
    connection.end();
  });
});

test("employee table has records", () => {
  connection.query("SELECT * FROM employees LIMIT 1", function (err, result) {
    if (err) throw err;
    expect(result.length).toBe(1);
    connection.end();
  });
});
