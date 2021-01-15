export const enum KeyCode {
    UP = "ArrowUp",
    DOWN = "ArrowDown",
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight"
}

export function keyListener(keyCodes: KeyCode | KeyCode[]) {
	if (!(keyCodes instanceof Array)) {
		keyCodes = [keyCodes];
	}

	return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
		const decorated: Function = descriptor.value;
		descriptor.value = function(event: KeyboardEvent) {
			if (!event || !(event instanceof KeyboardEvent) || !(<string[]><any>keyCodes).includes(event.code)) {
				return;
			}
			event.preventDefault();
			return decorated.apply(this, arguments);
		}
	}
}
