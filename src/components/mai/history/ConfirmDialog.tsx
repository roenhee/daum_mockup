interface ConfirmDialogProps {
  title: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  title,
  body,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[300px] bg-white rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-4 text-center">
          <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">{body}</p>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 text-[14px] font-semibold text-gray-600 active:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 text-[14px] font-semibold text-daum-red border-l border-gray-100 active:bg-gray-50"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
