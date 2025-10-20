// Test payload that matches your user collection structure
const testPayload = {
    "first_name": "John",
    "last_name": "Doe",
    "email": "test@example.com",
    "graduation_year": "2024",
    "country": "United States",
    "$id": "test123",
    "$collectionId": "openstart",
    "$databaseId": "68c05c900023ab00a1f0"
  };
  
  console.log('Test payload for welcome email:');
  console.log(JSON.stringify(testPayload, null, 2));