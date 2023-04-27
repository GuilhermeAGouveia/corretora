abstract class DTO<T> {
    public abstract toJSON(): T;
}

export default DTO;