t = int(input())

for _ in range(t):
    n = int(input())

    # Divide by 2 until odd
    seq = []
    while n > 1:
        if n % 2 == 0:
            seq.append(2)
            n //= 2
        else:
            seq.append(1)
            n -= 1
    
    # Construct sequence backwards
    res = ""
    for x in reversed(seq):
        res += str(x)

        # If x is 2, obtain previous value by dividing by 2
        if x == 2:
            n //= 2
    
    # If n is odd, add a 1 to the beginning of the sequence
    if n == 1:
        res += "1"

    print(res)
