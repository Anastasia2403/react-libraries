import { Visitor } from "../types/Visitor";

const API_URL = `http://localhost:9000/api/v1/library/visitor`;

export function getAllVisitors(tenant: string, pageNumber: number, pageSize: number, keyword: string): Promise<Visitor[]> {
  return fetch(`${API_URL}/?tenant=${tenant}&pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(response => response.json());
}

export function getVisitorById(id: number): Promise<Visitor> {
  return fetch(`${API_URL}/${id}`)
    .then(response => response.json());
}

export function createVisitor(visitor: Visitor): Promise<Visitor> {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(visitor)
  }).then(response => response.json());
}

export function updateVisitor(visitor: Visitor): Promise<Visitor> {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(visitor)
  }).then(response => response.json());
}

export function deleteVisitor(id: number): Promise<Visitor> {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(response => response.json());
}