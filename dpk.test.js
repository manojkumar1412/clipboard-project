const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the non empty literal when given event without partitionKey", () => {
    let event = {"key": "value"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("163696cd46674b4fdd7dce65027cc78ad9347884c556d18b814d9c53dff854c92ad25d0eb2c58c279d04215a57772236a679839092d342c41c2563fad5256ee2");
  });

  it("Returns the literal '30' when given event with positive integer partitionKey", () => {
    let event = {"partitionKey": 30};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("30");
  });

  it("Returns the literal '-30' when given event with negative partitionKey", () => {
    let event = {"partitionKey": -30};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("-30");
  });

  it("Returns the non empty literal when given event with 0 partitionKey", () => {
    let event = {"partitionKey": 0};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7");
  });

  it("Returns the non empty literal when given event with empty string partitionKey", () => {
    let event = {"partitionKey": ""};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6");
  });

  it("Returns the literal ' ' when given event with blank string partitionKey", () => {
    let event = {"partitionKey": " "};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(" ");
  });

  it("Returns the non empty literal when given event with non blank string partitionKey", () => {
    let event = {"partitionKey": "abcd"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abcd");
  });

  it("Returns the non empty string literal when given event with partitionKey length > 256", () => {
    let event = {"partitionKey": "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("fe6ca3c4feee59bfc7d57e06c542d2383d01df09e97cc27df1b46329c9a11443bf2ec49bbc3347f44a1189095b745ea3cdca95f090ab120dd7fe9a8d765bdcbd");
  });

  it("Returns the non empty string literal when given event with partitionKey length = 256", () => {
    let event = {"partitionKey": "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv");
  });

  it("Returns the non empty string literal when given event with partitionKey length < 256", () => {
    let event = {"partitionKey": "abcd"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abcd");
  });

});
