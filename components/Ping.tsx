const Ping = () => {
    return (
      <div className="relative">
        <span className="flex size-[6px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex size-[6px] rounded-full bg-white"></span>
        </span>
      </div>
    );
  };
  export default Ping;