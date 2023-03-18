import { Injectable } from '@nestjs/common';

interface QueueNode {
  item: number;
  priority: number;
  next?: QueueNode;
}
@Injectable()
export class AppService {
  private front: QueueNode;

  insert(item: number, priority: number) {
    const newNode = { item, priority } as QueueNode;

    // Handle case where the queue is empty or newNode has highest priority
    if (!this.front || priority < this.front.priority) {
      newNode.next = this.front;
      this.front = newNode;
    } else {
      let current = this.front;
      while (current.next && priority >= current.next.priority) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
    console.log('this.front-->', this.front);
  }

  pop() {
    if (!this.front) {
      return null;
    }

    const item = this.front.item;
    this.front = this.front.next;

    return item;
  }

  peek() {
    return this.front ? this.front.item : null;
  }

  isEmpty() {
    return !this.front;
  }
}
