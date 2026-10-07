import { AppError } from "./AppError";

export class ValidationError extends AppError{
    constructor(message: string){
        super(message, "VALIDATION_ERROR")
    }
}

export class NotFoundError extends AppError{
    constructor(resource: string){
        super(`${resource} not found`, "NOT_FOUND")
    }
}

export class UnauthorizedError extends AppError{
    constructor(){
        super("Unauthorized", "UNAUTHORIZED")
    }
}

export class ConflictError extends AppError{
    constructor(message: string){
        super(message, "CONFLICT")
    }
}

export class ForbiddenError extends AppError{
    constructor(){
        super("Forbidden", "FORBIDDEN")
    }
}

export class RateLimitError extends AppError{
    constructor(message = "Too many requests. Please try again later"){
        super(message, "RATE_LIMIT")
    }
}

export class NetworkError extends AppError{
    constructor(message = "Unable to connect to the server"){
        super(message, "NETWORK")
    }
}