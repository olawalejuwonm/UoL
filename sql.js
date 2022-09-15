// Consider the database below for the famous insurance company
// Mostlyreliable.com.
// Each line shows a table with its properties,
// TableName (column1, column2, ...), and the primary keys and foreign
// keys are underlined. For example, ‘policy id’ is the PRIMARY KEY of
// Policies and ‘customer id’ is a FOREIGN KEY.
// Customers (customer id, name, address)
// Policies (policy id, policy type, customer id, expiry date)
// Claims (claim id, policy id, amount, type, status)


//TODO 1
//I n a controversial new company policy, Mostlyreliable.com no longer covers
// claims of type “accidental loss”. Write an SQL command which updates
// all claims whose status is not “resolved” or “rejected” to have status of
// “rejected”.

//The query is
`UPDATE Claims SET status = 'rejected' WHERE type = 'accidental loss' AND status != 'resolved' AND status != 'rejected'`
//This query will update all claims whose type is 'accidental loss' and status is not 'resolved' or 'rejected' to have status 'rejected'
//Claims is the table name, status is the column name, 'rejected' is the value to be updated to, type = 'accidental loss' is the condition, status != 'resolved' AND status != 'rejected' is the condition

//TODO 2

// Statutory regulations require that Mostlyreliable.com must inform any customers
// who have been affected by its recent drastic policy change.
// Using an appropriate SQL JOIN statement, display the claim ids, policy ids
// for all claims of type “accidental loss” together with the associated customer ids.

//The query is
// `SELECT Claims.claim_id, Claims.policy_id, Policies.customer_id FROM Claims JOIN Policies ON Claims.policy_id = Policies.policy_id WHERE Claims.type = 'accidental loss'`
//This query will select the claim_id, policy_id and customer_id from Claims and Policies table where the type of claim is 'accidental loss'
//Claims is the table name, claim_id is the column name, policy_id is the column name, Policies is the table name, customer_id is the column name, Claims.policy_id = Policies.policy_id is the condition, Claims.type = 'accidental loss' is the condition
//The JOIN statement is used to join the Claims and Policies table together based on the condition that the policy_id in Claims table is equal to the policy_id in Policies table
//The WHERE statement is used to filter the result based on the condition that the type of claim is 'accidental loss'
//The SELECT statement is used to select the claim_id, policy_id and customer_id from Claims and Policies table
//The FROM statement is used to specify the table name
//

//TODO 3

// The customer ‘Jamilla Jessop’ is being audited by Mostlyreliable.com for
// suspicious claim activity. Write an SQL statement to find the number of
// rejected claims for Ms Jessop.

// The query is
// `SELECT COUNT(*) FROM Claims JOIN Policies ON Claims.policy_id = Policies.policy_id WHERE Policies.customer_id = '(SELECT customer_id FROM Customers WHERE name = 'Jamilla Jessop')' AND Claims.status = 'rejected'`
// The count(*) function is used to count the number of rows in the result.The * will return all the rows in the result and COUNT(*) will count the number of rows in the result
// Just like the above queries, the JOIN statement is used to join the Claims and Policies table together based on the condition that the policy_id in Claims table is equal to the policy_id in Policies table
// The WHERE statement filters the result based on the condition that the customer_id is 'Jamilla Jessop' and the status of the claim is 'rejected'


//TODO 4

// It is time to calculate the annual no claim bonuses for Mostlyreliable.com’s
// customers. Write an SQL command using the appropriate JOIN to return
// a list of customer ids who are due a no claims bonus

// Hint: You will need the “IS NULL” operator to check for NULL values.


// The query is
// `SELECT Policies.customer_id FROM Claims JOIN Policies ON Claims.policy_id = Policies.policy_id WHERE Claims.status IS NULL`
// The Policies table is used because the customer_id is in the Policies table and the Claims table is used because the status is in the Claims table
// That are the main fields needed to be selected
// These two tables are joined together based on the condition that the policy_id in Claims table is equal to the policy_id in Policies table
// This query will select the customer_id from Claims and Policies table where the status of the claim is NULL

// TODO 5

// In yet another sudden change of company policy only ”silver” and ”gold”
// policies will receive no claims bonuses. We will therefore need to inform
// all of those “bronze” policy holders who were previously due a no claims
// bonus.

// Modify the command from part TODO 3 to return only the customers with
// “bronze” policies. Then expand the command to return the full customer
// and policy data so that we can contact them.

// Hint: You will need to use both LEFT and RIGHT joins to do this.

// TODO 3 is // `SELECT COUNT(*) FROM Claims JOIN Policies ON Claims.policy_id = Policies.policy_id WHERE Policies.customer_id = 'Jamilla Jessop' AND Claims.status = 'rejected'`

// The query is
// `SELECT Customers.customer_id, Customers.name, Customers.address, Policies.policy_id, Policies.policy_type FROM Customers LEFT JOIN Policies ON Customers.customer_id = Policies.customer_id RIGHT JOIN Claims ON Policies.policy_id = Claims.policy_id WHERE Policies.policy_type = 'bronze' AND Claims.status IS NULL`
// The query will select the customer_id, name, address, policy_id and policy_type from Customers, Policies and Claims table where the policy_type is 'bronze' and the status of the claim is NULL
// The LEFT JOIN statement joins the Customers and Policies table together based on the condition that the customer_id in Customers table is equal to the customer_id in Policies table. It will return all the rows in the Customers table and the matching rows in the Policies table
// The RIGHT JOIN statement joins the Policies and Claims table together based on the condition that the policy_id in Policies table is equal to the policy_id in Claims table. This will in turn return all the rows in the Policies table and the matching rows in the Claims table
// The WHERE statement filters the result based on the condition that the policy_type is 'bronze' and the status of the claim is NULL
// The SELECT statement select the customer_id, name, address, policy_id and policy_type from Customers, Policies and Claims table after all the tables are joined together