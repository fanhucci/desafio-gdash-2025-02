package main

import (
	"bytes"

	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

const (
	rabbitURL = "amqp://guest:guest@rabbitmq:5672/"
	queueName = "clima"
	apiURL    = "http://backend:3000/clima"
)

func main() {
	for {
		err := startConsumer()
		if err != nil {
			log.Println("[ERRO] Conexão perdida. Tentando reconectar em 5s...", err)
			time.Sleep(5 * time.Second)
		}
	}
}

func startConsumer() error {

	conn, err := amqp091.Dial(rabbitURL)
	if err != nil {
		log.Println("Erro ao conectar no RabbitMQ:", err)
		return err
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Println("Erro ao abrir canal:", err)
		return err
	}
	defer ch.Close()

	_, err = ch.QueueDeclare(
		queueName,
		true,  
		false, 
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	msgs, err := ch.Consume(
		queueName,
		"",
		true, 
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	log.Println("[*] Aguardando mensagens...")

	for msg := range msgs {
		log.Println("[x] Mensagem recebida:", string(msg.Body))

		go enviarParaAPI(msg.Body) 
	}

	return fmt.Errorf("canal fechado")
}

func enviarParaAPI(data []byte) {
	client := &http.Client{Timeout: 5 * time.Second}

	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(data))
	if err != nil {
		log.Println("Erro ao criar request:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		log.Println("Erro na requisição:", err)
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		log.Printf("API respondeu com status %d\n", resp.StatusCode)
	}
}
