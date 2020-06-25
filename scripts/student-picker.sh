#!/bin/bash

declare -a arr=("Kriván Zoltán" "Luczó Attila" "Bráj Roland" "Furus Javier" "Juhász Péter" "Junászka Klaudia" "Tanácsné Izabella" "Tóth Levente Zsolt")

index=$(( ( RANDOM % 8 ) ))

echo "It is your turn: ${arr[$index]}"
