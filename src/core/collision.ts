import { Circle } from "./Circle";
import { Paddle } from "./Paddle";
import { Rectangle } from "./Rectangle";

export function checkCircleCollision(ball1: Circle, ball2: Circle) {
  const dx = ball1.x - ball2.x;
  const dy = ball1.y - ball2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ball1.radius + ball2.radius) {
    // Calculate new velocities using conservation of momentum and kinetic energy
    const totalMass = ball1.radius + ball2.radius;
    const vx1Final =
      ((ball1.radius - ball2.radius) * ball1.dx + 2 * ball2.radius * ball2.dx) /
      totalMass;
    const vy1Final =
      ((ball1.radius - ball2.radius) * ball1.dy + 2 * ball2.radius * ball2.dy) /
      totalMass;
    const vx2Final =
      ((ball2.radius - ball1.radius) * ball2.dx + 2 * ball1.radius * ball1.dx) /
      totalMass;
    const vy2Final =
      ((ball2.radius - ball1.radius) * ball2.dy + 2 * ball1.radius * ball1.dy) /
      totalMass;
    // Set the new velocities for the balls
    ball1.dx = vx1Final;
    ball1.dy = vy1Final;
    ball2.dx = vx2Final;
    ball2.dy = vy2Final;
  }
}

export function checkCollisionCircleRectangle(
  circle: Circle,
  rect: Rectangle | Paddle
) {
  let isCollided = false;
  // Find the closest point on the rectangle to the circle's center
  let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  // Calculate the distance between the circle's center and the closest point
  let distanceX = circle.x - closestX;
  let distanceY = circle.y - closestY;
  let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Check if the distance is less than or equal to the circle's radius
  if (distance <= circle.radius) {
    isCollided = true;
    // Calculate the normal vector from the rectangle's edge to the circle's center
    let normalX = distanceX / distance;
    let normalY = distanceY / distance;

    // Calculate the relative velocity of the ball
    let relativeVelocityX = circle.dx;
    let relativeVelocityY = circle.dy;

    // Calculate the dot product of the relative velocity and the normal vector
    let dotProduct = relativeVelocityX * normalX + relativeVelocityY * normalY;

    // Calculate the change in velocity for the ball due to the collision
    let deltaVelocityX = -2 * dotProduct * normalX;
    let deltaVelocityY = -2 * dotProduct * normalY;

    // Update the ball's velocity
    circle.dx += deltaVelocityX;
    circle.dy += deltaVelocityY;
  }

  return isCollided;
}
