# tangseng.swf Decryption

The game module tangseng.swf is XOR encrypted.

## Encryption Method

- Encryption starts at byte offset 9473
- Each byte is XORed with value 2
- Bytes before offset 9473 are not encrypted

## Decryption Script (Python)

```python
import sys

def decrypt_tangseng(input_path, output_path):
    with open(input_path, 'rb') as f:
        data = bytearray(f.read())
    
    for i in range(9473, len(data)):
        data[i] ^= 2
    
    with open(output_path, 'wb') as f:
        f.write(data)

if __name__ == '__main__':
    decrypt_tangseng(sys.argv[1], sys.argv[2])
```

## File Sizes

| Version | Encrypted | Decrypted |
|---------|-----------|-----------|
| 5.5.1   | 18.3MB    | 18.3MB    |
| 5.5.3   | 18.3MB    | 18.3MB    |
| 5.5.4   | 18.3MB    | 18.3MB    |
