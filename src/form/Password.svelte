<div class="base">
    {#if revealed}
        <input name={id} {id} {required} {disabled} type="text" bind:value bind:this={pwd} />
    {:else}
        <input name={id} {id} {required} {disabled} type="password" bind:value bind:this={pwd} />
    {/if}
    {#if reveal}
        <div class="revealer" on:mousedown={show} on:mouseup={hide}>
            {#if revealed}
                ✘
            {:else}
                👁
            {/if}
        </div>
    {/if}
    {#if $$slots.default}
        <label for={id}><slot /></label>
    {/if}
</div>
