# Start from the official Go image as the base
FROM golang:latest

# Set the working directory for the app
WORKDIR /app
# Copy the go.mod and go.sum files to the container
COPY go.mod go.sum ./

RUN go mod download 
# Copy the source code into the container
COPY . .

# Install the MySQL driver for Go
RUN go get -u github.com/go-sql-driver/mysql

# Expose the port that the app will run on
EXPOSE 8080

# Build the Go app
RUN go build -o main .


# Run the app
# CMD ["./main"]
CMD ["sh", "-c", "sleep 10 && ./main"]